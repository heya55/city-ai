export const memory = {
  sessions: [],

  add(session) {
    this.sessions.push({
      time: Date.now(),
      ...session
    });
  },

  getLastResult() {
    return this.sessions.length
      ? this.sessions[this.sessions.length - 1].result
      : null;
  },

  getTrend() {
    const trend = {};

    for (const s of this.sessions) {
      for (const k in s.profile) {
        trend[k] = (trend[k] || 0) + s.profile[k];
      }
    }

    return trend;
  }
};