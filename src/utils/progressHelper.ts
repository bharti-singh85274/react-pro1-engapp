export const calculateCourseProgress = (
  progressList,
  totalLessons = 0
) => {
  if (!Array.isArray(progressList)) return 0;

  const completedCount = progressList.filter(
    (p) => p.completed === true
  ).length;

  if (!totalLessons) return 0;

  return Math.round((completedCount / totalLessons) * 100);
};