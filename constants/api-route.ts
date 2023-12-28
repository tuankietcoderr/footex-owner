const API_ROUTE = {
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:2003/api"
      : "https://footex.up.railway.app/api",
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
    STATUS: "/field/:id/status",
  },
  FIELD_BOOKED_QUEUE: {
    INDEX: "/field-booked-queue",
    ID: "/field-booked-queue/:id",
    STATUS: "/field-booked-queue/:id/status",
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
    PHONE_NUMBER: "/guest/phone-number/:phone",
    SEARCH_BY_EMAIL_OR_PHONE_NUMBER: "/guest/search/:emailOrPhoneNumber",
    ID: "/guest/:id",
  },
  OWNER: {
    INDEX: "/owner",
    SIGN_IN: "/owner/signin",
    SIGN_UP: "/owner/signup",
    VERIFY_EMAIL: "/owner/verify-email",
    SEND_VERIFY_EMAIL: "/owner/send-verify-email",
    FORGOT_PASSWORD: "/owner/forgot-password",
    STATUS: "/owner/status",
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
    STATUS: "/tournament/:id/status",
    GUEST_JOINT: "/tournament/joint",
    TEAM: "/tournament/team/:id",
    JOIN: "/tournament/:id/join",
    BRANCH: "/tournament/branch/:id",
  },
  MATCH: {
    INDEX: "/match",
    ID: "/match/:id",
    GOAL: "/match/:id/goal",
    GOAL_ID: "/match/:id/goal/:goalId",
    CARD_FINE: "/match/:id/fine",
    CARD_FINE_ID: "/match/:id/fine/:fineId",
    CARD_FINE_ID_CARD: "/match/:id/fine/:fineId/card",
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
  PRIZE: {
    INDEX: "/prize",
    ID: "/prize/:id",
    BRANCH: "/prize/branch/:id",
  },
  RATE: {
    INDEX: "/rate",
    OBJECT: "/rate/:objectType/:objectId",
  },
  INVOICE: {
    INDEX: "/invoice",
    ID: "/invoice/:id",
    STATUS: "/invoice/:id/status",
    BRANCH: "/invoice/branch/:id",
  },
}

export default API_ROUTE
