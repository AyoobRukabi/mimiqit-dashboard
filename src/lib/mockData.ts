import { FilterState } from './FilterContext';

// Mock data generator based on filters
export function generateKPIData(filters: FilterState) {
  const baseMultiplier = filters.dateRange === 'today' ? 0.3 :
                         filters.dateRange === '7days' ? 1 :
                         filters.dateRange === '30days' ? 4 :
                         filters.dateRange === '90days' ? 12 : 1;

  const classMultiplier = filters.classType === 'all' ? 1 :
                          filters.classType === 'yoga' ? 1.2 :
                          filters.classType === 'hiit' ? 0.9 :
                          filters.classType === 'pilates' ? 1.1 : 1;

  const instructorMultiplier = filters.instructor === 'all' ? 1 :
                               filters.instructor === 'anna' ? 1.15 :
                               filters.instructor === 'erik' ? 0.95 : 1;

  const totalMultiplier = baseMultiplier * classMultiplier * instructorMultiplier;

  return {
    revenue: Math.round(1240 * totalMultiplier),
    revenueChange: Math.round(12 * classMultiplier),
    attendance: Math.round(87 * instructorMultiplier),
    attendanceChange: Math.round(5 * instructorMultiplier),
    cancellations: Math.max(1, Math.round(3 / instructorMultiplier)),
    cancellationsChange: Math.round(25 * instructorMultiplier),
    returningUsers: Math.round(68 * instructorMultiplier),
    returningChange: Math.round(8 * instructorMultiplier),
    newClients: Math.round(12 * totalMultiplier),
    newClientsChange: Math.round(15 * classMultiplier),
    topInstructor: filters.instructor === 'all' ? 'Anna' : 
                   filters.instructor === 'anna' ? 'Anna' :
                   filters.instructor === 'erik' ? 'Erik' :
                   filters.instructor === 'sofia' ? 'Sofia' : 'Lars',
    fillRate: Math.round(92 * instructorMultiplier),
  };
}

export function generateRevenueData(filters: FilterState) {
  const days = filters.dateRange === 'today' ? 1 :
               filters.dateRange === '7days' ? 7 :
               filters.dateRange === '30days' ? 30 : 7;

  const baseValue = 850;
  const classMultiplier = filters.classType === 'all' ? 1 :
                          filters.classType === 'yoga' ? 1.3 :
                          filters.classType === 'hiit' ? 1.1 :
                          filters.classType === 'pilates' ? 1.2 : 1;

  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = days === 1 ? 'Today' : 
                    days === 7 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][(date.getDay() + 6) % 7] :
                    `${date.getMonth() + 1}/${date.getDate()}`;
    
    const variance = Math.random() * 0.3 + 0.85;
    const trend = 1 + (days - i) * 0.02;
    const amount = Math.round(baseValue * classMultiplier * variance * trend);
    
    data.push({ date: dateStr, amount });
  }
  
  return data;
}

export function generateAttendanceData(filters: FilterState) {
  const baseAttendance = 80;
  const classMultiplier = filters.classType === 'all' ? 1 :
                          filters.classType === 'yoga' ? 1.1 :
                          filters.classType === 'spinning' ? 1.15 :
                          filters.classType === 'hiit' ? 0.95 : 1;

  const instructorMultiplier = filters.instructor === 'all' ? 1 :
                               filters.instructor === 'anna' ? 1.12 :
                               filters.instructor === 'erik' ? 1.05 : 1;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return days.map(day => {
    const variance = Math.random() * 0.15 + 0.92;
    const weekendBoost = (day === 'Sat' || day === 'Sun') ? 1.08 : 1;
    const attendance = Math.round(baseAttendance * classMultiplier * instructorMultiplier * variance * weekendBoost);
    return { day, attendance: Math.min(100, attendance) };
  });
}

// KPI Detail data
export function getKPIDetails(kpiType: string, filters: FilterState) {
  const data = generateKPIData(filters);
  
  switch (kpiType) {
    case 'revenue':
      return {
        title: 'Revenue Today',
        value: `€${data.revenue.toLocaleString()}`,
        change: `${data.revenueChange}%`,
        details: [
          { label: 'Total Classes', value: '24' },
          { label: 'Avg per Class', value: `€${Math.round(data.revenue / 24)}` },
          { label: 'Monthly Target', value: '€35,000' },
          { label: 'Progress', value: `${Math.round((data.revenue * 30) / 35000 * 100)}%` },
        ],
        insights: [
          'Peak revenue hours: 6-7 PM',
          'Highest earning class: HIIT',
          'Weekend classes +15% revenue',
        ],
      };
    case 'attendance':
      return {
        title: 'Attendance Rate',
        value: `${data.attendance}%`,
        change: `${data.attendanceChange}%`,
        details: [
          { label: 'Classes Held', value: '24' },
          { label: 'Total Bookings', value: '187' },
          { label: 'Show-up Rate', value: `${data.attendance}%` },
          { label: 'No-shows', value: '13' },
        ],
        insights: [
          'Best attendance: Saturday mornings',
          'Reminder SMS reduces no-shows by 40%',
          'Early bird classes: 92% attendance',
        ],
      };
    case 'cancellations':
      return {
        title: 'Cancellations',
        value: `${data.cancellations}`,
        change: `${data.cancellationsChange}%`,
        details: [
          { label: 'Last Minute', value: '1' },
          { label: '24h+ Notice', value: '2' },
          { label: 'Cancellation Rate', value: '1.6%' },
          { label: 'No Penalty', value: '2' },
        ],
        insights: [
          'Most cancellations: Monday 6 AM',
          'Weather affects outdoor classes',
          'Flexible policy improves retention',
        ],
      };
    case 'returning':
      return {
        title: 'Returning Users',
        value: `${data.returningUsers}%`,
        change: `${data.returningChange}%`,
        details: [
          { label: 'Active Members', value: '142' },
          { label: 'Returned This Week', value: '97' },
          { label: 'Avg Visits/Week', value: '3.2' },
          { label: 'Retention Rate', value: `${data.returningUsers}%` },
        ],
        insights: [
          'Members with 3+ classes/week: 85% retention',
          'Community events boost loyalty',
          'Personalized plans improve retention by 23%',
        ],
      };
    case 'newclients':
      return {
        title: 'New Clients',
        value: `${data.newClients}`,
        change: `${data.newClientsChange}%`,
        details: [
          { label: 'This Week', value: `${data.newClients}` },
          { label: 'From Referrals', value: '5' },
          { label: 'From Social Media', value: '4' },
          { label: 'Walk-ins', value: '3' },
        ],
        insights: [
          'Referral program: 42% of new signups',
          'Instagram ads ROI: 3.2x',
          'Free trial converts at 67%',
        ],
      };
    case 'instructor':
      return {
        title: 'Top Instructor',
        value: data.topInstructor,
        change: `${data.fillRate}% fill rate`,
        details: [
          { label: 'Classes This Week', value: '12' },
          { label: 'Avg Rating', value: '4.9/5' },
          { label: 'Fill Rate', value: `${data.fillRate}%` },
          { label: 'Repeat Bookings', value: '78%' },
        ],
        insights: [
          `${data.topInstructor}'s signature class: Yoga Flow`,
          'Member favorite for beginners',
          'Consistently exceeds targets',
        ],
      };
    default:
      return null;
  }
}
