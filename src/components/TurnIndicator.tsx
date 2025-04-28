interface TurnIndicatorProps {
  usedPoints: number;
  totalPoints: number;
}

function TurnIndicator({ usedPoints, totalPoints }: TurnIndicatorProps) {
  return (
    <div className="mt-6 text-xl">
      Points Used: {usedPoints} / {totalPoints}
    </div>
  );
}

export default TurnIndicator;
