export const getGoalFormatted = (goals: any[]) => {
  return goals.map(goal => ({
    _id: String(goal._id),
    name: goal.name,
    finished: goal?.finished,
  }))
}