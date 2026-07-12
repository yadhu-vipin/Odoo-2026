import { headers, cookies } from 'next/headers';
import { VehicleRegistryClient } from '../fleet/VehicleRegistryClient';

export default async function VehiclesPage() {
  const headerList = await headers();
  const cookieStore = await cookies();
  const userTag = parseInt(headerList.get('x-user-tag') || cookieStore.get('user_tag')?.value || '1', 10);

  const vehicles = [
    { reg: 'ADU-0072', name: 'MAN-05', type: 'Van', cap: '500 kg', odo: '74,000 km', cost: '$120,000', status: 'Available' },
    { reg: 'ADU-0073', name: 'TRUCK-01', type: 'Truck', cap: '2 Ton', odo: '112,000 km', cost: '$240,000', status: 'On Trip' },
    { reg: 'ADU-0081', name: 'MAN-03', type: 'Van', cap: '1 Ton', odo: '66,200 km', cost: '$150,000', status: 'In Shop' },
    { reg: 'ADU-0082', name: 'MAN-04', type: 'Van', cap: '750 kg', odo: '241,100 km', cost: '$110,000', status: 'Retired' },
  ];

  // Server-side baseline safety filtering
  const visibleVehicles = vehicles.filter(v => userTag !== 2 || v.status !== 'In Shop');

  return <VehicleRegistryClient initialVehicles={visibleVehicles} userTag={userTag} />;
}