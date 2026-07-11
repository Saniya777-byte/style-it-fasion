export function downloadFile(content, fileName, contentType = "text/plain") {
  if (typeof window === "undefined") return;

  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportReportAsJSON(report) {
  const content = JSON.stringify(report, null, 2);
  downloadFile(content, `${report.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_report.json`, "application/json");
}

export function exportReportAsText(report) {
  let text = `MEETING REPORT: ${report.title}\n`;
  text += `Date: ${new Date(report.date).toLocaleDateString()}\n`;
  text += `Duration: ${report.duration}\n`;
  text += `Compliance Score: ${report.complianceScore || "N/A"}%\n`;
  text += `Company: ${report.company}\n\n`;
  text += `SUMMARY:\n${report.summary}\n\n`;
  
  text += `KEY DECISIONS:\n`;
  report.keyDecisions.forEach((dec, i) => {
    text += `${i + 1}. ${dec.text} (Agreed by: ${dec.agreedBy})\n`;
  });
  text += `\n`;

  text += `ACTION ITEMS:\n`;
  report.actionItems.forEach((act, i) => {
    text += `${i + 1}. ${act.task} - Owner: ${act.owner} - Due: ${act.dueDate} (${act.status})\n`;
  });
  text += `\n`;

  text += `TRANSCRIPT:\n`;
  report.transcript.forEach(line => {
    text += `[${line.time}] ${line.speaker}: ${line.text}\n`;
  });

  downloadFile(text, `${report.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_report.txt`, "text/plain");
}
