using Microsoft.EntityFrameworkCore;
using PatientManagement.API.Data;
using PatientManagement.API.DTOs;
using PatientManagement.API.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVite",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("PatientDb"));

builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

app.UseCors("AllowVite");

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();
}

app.MapPost("/api/auth/login", (LoginRequest req) =>
{
    if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
    {
        return Results.Problem("Invalid credentials", statusCode: 400);
    }
    return Results.Ok(new LoginResponse("mock-jwt-token-123456", DateTime.UtcNow.AddHours(2)));
});

app.MapGet("/api/appointments", async (AppDbContext db, string? filter) =>
{
    var today = DateTime.UtcNow.Date;
    var query = db.Appointments.Include(a => a.Patient).AsQueryable();

    if (filter?.ToLower() == "today")
    {
        query = query.Where(a => a.AppointmentDateTime.Date == today);
    }
    else if (filter?.ToLower() == "tomorrow")
    {
        var tomorrow = today.AddDays(1);
        query = query.Where(a => a.AppointmentDateTime.Date == tomorrow);
    }

    var appointments = await query.ToListAsync();

    var dtos = appointments.Select(a => new AppointmentDto(
        a.Id,
        a.PatientId,
        a.Patient!.PatientNumber,
        $"{a.Patient.FirstName} {a.Patient.LastName}",
        a.Patient.Gender,
        a.Patient.DateOfBirth,
        a.AppointmentDateTime,
        a.DoctorName,
        a.Status,
        a.ReasonForVisit
    )).OrderBy(a => a.AppointmentDateTime);

    return Results.Ok(dtos);
});

app.MapGet("/api/patients/{id:guid}", async (Guid id, AppDbContext db) =>
{
    var patient = await db.Patients.FindAsync(id);
    if (patient == null) return Results.NotFound();

    return Results.Ok(new PatientDto(
        patient.Id,
        patient.PatientNumber,
        patient.FirstName,
        patient.LastName,
        patient.DateOfBirth,
        patient.Gender,
        patient.ContactNumber,
        patient.Email,
        patient.Address,
        patient.BloodGroup,
        patient.MedicalAlerts
    ));
});

app.MapPost("/api/patients", async (PatientDto dto, AppDbContext db) =>
{
    var patient = await db.Patients.FindAsync(dto.Id);
    
    if (patient == null)
    {
        patient = new Patient
        {
            Id = dto.Id != Guid.Empty ? dto.Id : Guid.NewGuid(),
            PatientNumber = string.IsNullOrWhiteSpace(dto.PatientNumber) ? $"PT-{new Random().Next(10000, 99999)}" : dto.PatientNumber
        };
        db.Patients.Add(patient);
    }

    patient.FirstName = dto.FirstName;
    patient.LastName = dto.LastName;
    patient.DateOfBirth = dto.DateOfBirth;
    patient.Gender = dto.Gender;
    patient.ContactNumber = dto.ContactNumber;
    patient.Email = dto.Email;
    patient.Address = dto.Address;
    patient.BloodGroup = dto.BloodGroup;
    patient.MedicalAlerts = dto.MedicalAlerts;

    await db.SaveChangesAsync();

    return Results.Ok(new PatientDto(
        patient.Id,
        patient.PatientNumber,
        patient.FirstName,
        patient.LastName,
        patient.DateOfBirth,
        patient.Gender,
        patient.ContactNumber,
        patient.Email,
        patient.Address,
        patient.BloodGroup,
        patient.MedicalAlerts
    ));
});

app.Run();
