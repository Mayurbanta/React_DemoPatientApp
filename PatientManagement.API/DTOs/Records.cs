namespace PatientManagement.API.DTOs;

public record LoginRequest(string Email, string Password);
public record LoginResponse(string Token, DateTime Expiration);

public record PatientDto(
    Guid Id,
    string PatientNumber,
    string FirstName,
    string LastName,
    DateTime DateOfBirth,
    string Gender,
    string ContactNumber,
    string Email,
    string Address,
    string BloodGroup,
    string MedicalAlerts
);

public record AppointmentDto(
    Guid Id,
    Guid PatientId,
    string PatientNumber,
    string PatientName,
    string Gender,
    DateTime DateOfBirth,
    DateTime AppointmentDateTime,
    string DoctorName,
    string Status,
    string ReasonForVisit
);
