interface FeedbackFlashProps {
  message?: string;
}

export function FeedbackFlash({ message }: FeedbackFlashProps) {
  if (!message) {
    return null;
  }

  return <p className="text-amber-400 text-sm mb-3">{message}</p>;
}
