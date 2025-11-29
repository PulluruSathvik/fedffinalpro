// src/utils/streakUtils.js
export function updateDailyStreak(studentId) {
  const key = `streak_${studentId}`;
  const stored = JSON.parse(localStorage.getItem(key)) || {
    currentStreak: 0,
    lastActiveDate: null,
    bestStreak: 0,
    badges: []
  };

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  if (stored.lastActiveDate === todayStr) {
    return stored; // already counted today
  }

  let currentStreak = stored.currentStreak;
  if (!stored.lastActiveDate) {
    currentStreak = 1;
  } else {
    const last = new Date(stored.lastActiveDate);
    const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      currentStreak += 1;        // consecutive day
    } else if (diffDays > 1) {
      currentStreak = 1;         // streak broken
    }
  }

  const bestStreak = Math.max(stored.bestStreak, currentStreak);

  const badges = new Set(stored.badges || []);
  if (currentStreak >= 3) badges.add("3-Day Starter");
  if (currentStreak >= 7) badges.add("1-Week Hero");
  if (currentStreak >= 14) badges.add("2-Week Grinder");
  if (currentStreak >= 30) badges.add("30-Day Legend");

  const updated = {
    currentStreak,
    bestStreak,
    lastActiveDate: todayStr,
    badges: Array.from(badges)
  };

  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
}

export function getStreakData(studentId) {
  const key = `streak_${studentId}`;
  return (
    JSON.parse(localStorage.getItem(key)) || {
      currentStreak: 0,
      bestStreak: 0,
      lastActiveDate: null,
      badges: []
    }
  );
}
