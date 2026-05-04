import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import type { Ship } from './gps';

let connection: HubConnection | null = null;

export function startShipHub(
  onShipReceived: (ship: Ship) => void
) {
  if (!connection) {
    connection = new HubConnectionBuilder()
      .withUrl('/hubs/ships')
      .withAutomaticReconnect()
      .build();
  }

  connection.on('ShipInfoUpdated', (data: string) => {
    const ship: Ship = JSON.parse(data);
    onShipReceived(ship);
  });

  connection.start().catch(console.error);

  return () => {
    connection?.stop();
  };
}