import { EmailReviewPage } from "@/components/review/ReviewPage";
import { editEmailStatus } from "@/app/page";

export default async function ReviewRoutePage({
  params,
}: {
  params: Promise<{ emailId: string }>;
}) {
  const { emailId } = await params;

  return <EmailReviewPage emailId={emailId} editEmailStatus={editEmailStatus}/>;
}
