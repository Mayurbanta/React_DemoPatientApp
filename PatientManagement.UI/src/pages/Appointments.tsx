import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Plus, Search, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { api } from '../lib/axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface AppointmentDto {
  id: string;
  patientId: string;
  patientNumber: string;
  patientName: string;
  gender: string;
  dateOfBirth: string;
  appointmentDateTime: string;
  doctorName: string;
  status: string;
  reasonForVisit: string;
}

export function Appointments() {
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState<'today' | 'tomorrow'>('today');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: appointments, isLoading, error } = useQuery<AppointmentDto[]>({
    queryKey: ['appointments', filterDate],
    queryFn: async () => {
      const response = await api.get(`/appointments?filter=${filterDate}`);
      return response.data;
    },
  });

  const filteredAppointments = appointments?.filter((app) =>
    app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.patientNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Appointments</h2>
          <p className="text-slate-500">Manage patient schedules and visits.</p>
        </div>
        <Button onClick={() => navigate('/patients/new')} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Button
              variant={filterDate === 'today' ? 'default' : 'outline'}
              onClick={() => setFilterDate('today')}
            >
              Today
            </Button>
            <Button
              variant={filterDate === 'tomorrow' ? 'default' : 'outline'}
              onClick={() => setFilterDate('tomorrow')}
            >
              Tomorrow
            </Button>
          </div>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search by name or ID..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3 hidden sm:table-cell">Gender/DOB</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3 hidden md:table-cell">Doctor</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="mt-2 text-slate-500">Loading appointments...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-red-500">
                    Failed to load appointments.
                  </td>
                </tr>
              ) : filteredAppointments?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <CalendarIcon className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-lg font-medium text-slate-900">No appointments found</p>
                    <p className="text-slate-500">There are no appointments matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredAppointments?.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/patients/${app.patientId}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{app.patientName}</div>
                      <div className="text-xs text-slate-500">{app.patientNumber}</div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div>{app.gender}</div>
                      <div className="text-xs text-slate-500">{format(new Date(app.dateOfBirth), 'MMM dd, yyyy')}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{format(new Date(app.appointmentDateTime), 'h:mm a')}</div>
                      <div className="text-xs text-slate-500 lg:hidden">{app.doctorName}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">{app.doctorName}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        app.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
