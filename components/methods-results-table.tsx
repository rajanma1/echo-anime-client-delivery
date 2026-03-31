import { PaperAnalysis } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MethodsResultsTableProps = {
  paper: PaperAnalysis;
};

export function MethodsResultsTable({ paper }: MethodsResultsTableProps) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="text-lg">Methods vs Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>What it does</TableHead>
              <TableHead>Result signal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paper.methodsVsResults.map((row) => (
              <TableRow key={row.method}>
                <TableCell className="font-medium text-foreground">{row.method}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
