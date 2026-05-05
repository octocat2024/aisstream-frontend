import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import type { Ship } from './gps';

let connection: HubConnection | null = null;

export function startShipHub(
  onShipReceived: (ship: Ship) => void
) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://bramcloud.nl'

  connection = new HubConnectionBuilder()
    .withUrl(`${baseUrl}/hubs/ships`)
    .withAutomaticReconnect()
    .build();

  connection.on('ShipInfoUpdated', (data: string) => {
    const ship: Ship = JSON.parse(data);
    onShipReceived(ship);
  });

  connection.start().catch(console.error);

  return () => {
    connection?.stop();
  };
}