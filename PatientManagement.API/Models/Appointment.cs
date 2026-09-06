namespace PatientManagement.API.Models;

public class Appointment
{
    public Guid Id { get; set; }
    public Guid PatientId { get; set; }
    public Patient? Patient { get; set; }
    
    public DateTime AppointmentDateTime { get; set; }
    public string DoctorName { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty; // Scheduled, Completed, Cancelled
    public string ReasonForVisit { get; set; } = string.Empty;
}
