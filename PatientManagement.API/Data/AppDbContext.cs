using Microsoft.EntityFrameworkCore;
using PatientManagement.API.Models;

namespace PatientManagement.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<Appointment> Appointments => Set<Appointment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        var patients = new List<Patient>();
        for (int i = 1; i <= 20; i++)
        {
            patients.Add(new Patient
            {
                Id = Guid.NewGuid(),
                PatientNumber = $"PT-{10000 + i}",
                FirstName = $"John{i}",
                LastName = $"Doe{i}",
                DateOfBirth = DateTime.UtcNow.AddYears(-30).AddDays(-i),
                Gender = i % 2 == 0 ? "Male" : "Female",
                ContactNumber = $"555-01{i:D2}",
                Email = $"patient{i}@example.com",
                Address = $"{i} Main St, Anytown, USA",
                BloodGroup = "O+",
                MedicalAlerts = i % 5 == 0 ? "Penicillin Allergy" : "None"
            });
        }
        
        var appointments = new List<Appointment>();
        var random = new Random(42);
        for (int i = 1; i <= 25; i++)
        {
            var patient = patients[random.Next(patients.Count)];
            var isToday = i % 2 == 0;
            appointments.Add(new Appointment
            {
                Id = Guid.NewGuid(),
                PatientId = patient.Id,
                AppointmentDateTime = isToday ? DateTime.UtcNow.Date.AddHours(9 + (i % 8)) : DateTime.UtcNow.Date.AddDays(1).AddHours(9 + (i % 8)),
                DoctorName = "Dr. Smith",
                Status = i % 4 == 0 ? "Completed" : "Scheduled",
                ReasonForVisit = "Routine Checkup"
            });
        }

        modelBuilder.Entity<Patient>().HasData(patients);
        modelBuilder.Entity<Appointment>().HasData(appointments);
    }
}
