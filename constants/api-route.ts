const API_ROUTE = {
  BRANCH: {
    INDEX: "/branch",
    ID: "/branch/:id",
    OWNER: "/branch/owner",
    STATUS: "/branch/:id/status",
  },
  FIELD: {
    INDEX: "/field",
    ID: "/field/:id",
    BRANCH: "/field/branch/:id",
  },
  FIELD_BOOKED_QUEUE: {
    INDEX: "/field-booked-queue",
    ID: "/field-booked-queue/:id",
    STATUS: "/field-booked-queue/status/:id",
    FIELD: "/field-booked-queue/field/:id",
    GUEST: "/field-booked-queue/guest/:id",
  },
  GUEST: {
    INDEX: "/guest",
    SIGN_IN: "/guest/signin",
    SIGN_UP: "/guest/signup",
    VERIFY_EMAIL: "/guest/verify-email",
    SEND_VERIFY_EMAIL: "/guest/send-verify-email",
    FORGOT_PASSWORD: "/guest/forgot-password",
  },
  OWNER: {
    INDEX: "/owner",
    SIGN_IN: "/owner/signin",
    SIGN_UP: "/owner/signup",
    VERIFY_EMAIL: "/owner/verify-email",
    SEND_VERIFY_EMAIL: "/owner/send-verify-email",
    FORGOT_PASSWORD: "/owner/forgot-password",
  },
  TEAM: {
    INDEX: "/team",
    ID: "/team/:id",
    CAPTAIN: "/team/captain",
    GUEST: "/team/guest",
    LEAVE: "/team/:id/leave",
    KICK: "/team/:id/kick",
  },
  INVITEMENT: {
    INDEX: "/invitement",
    ID: "/invitement/:id",
    STATUS: "/invitement/status/:id",
    GUEST: "/invitement/guest",
    TEAM: "/invitement/team",
  },
  TOURNAMENT: {
    INDEX: "/tournament",
    ID: "/tournament/:id",
    GUEST_JOINT: "/tournament/joint",
    TEAM: "/tournament/team/:id",
    JOIN: "/tournament/:id/join",
  },
  MATCH: {
    INDEX: "/match",
  },
  MATCH_RESULT: {
    INDEX: "/match-result",
  },
  MATCH_RESULT_DETAIL: {
    INDEX: "/match-result-detail",
  },
  GOAL_DETAIL: {
    INDEX: "/goal-detail",
  },
  CARD_FINE: {
    INDEX: "/card-fine",
  },
  PRIZE: {
    INDEX: "/prize",
  },
  RATE: {
    INDEX: "/rate",
  },
}

export default API_ROUTE
