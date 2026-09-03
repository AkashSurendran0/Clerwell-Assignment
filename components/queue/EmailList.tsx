import { EmailListItem, type EmailItem } from "./EmailListItem";
import { EmptyState } from "./EmptyState";

type EmailListProps = {
  emails: EmailItem[];
  onClearFilters: () => void;
};

export function EmailList({ emails, onClearFilters }: EmailListProps) {
  if (emails.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <EmailListItem key={email.id} email={email} />
      ))}
    </div>
  );
}
