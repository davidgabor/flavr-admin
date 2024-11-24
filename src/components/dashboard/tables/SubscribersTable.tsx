import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface SubscribersTableProps {
  subscribers: any[];
}

export const SubscribersTable = ({ subscribers }: SubscribersTableProps) => {
  return (
    <div className="rounded-md border border-white/5">
      <Table>
        <TableHeader>
          <TableRow className="border-white/5">
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Subscribed Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.map((subscriber) => (
            <TableRow key={subscriber.id} className="border-white/5">
              <TableCell className="text-white">{subscriber.email}</TableCell>
              <TableCell className="text-dashboard-muted">
                {format(new Date(subscriber.created_at), "MMM d, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};