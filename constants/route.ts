const ROUTE = {
  INDEX: "/",
  BRANCH: {
    INDEX: "/chi-nhanh",
    CREATE: "/chi-nhanh/them-moi",
    ID: "/chi-nhanh/:id",
    DASHBOARD: "/chi-nhanh/:id/dashboard",
    FIELD: {
      INDEX: "/chi-nhanh/:branchId/quan-ly-san",
      ID: "/chi-nhanh/:branchId/quan-ly-san/:id",
      BOOK: "/chi-nhanh/:branchId/quan-ly-san/:id/dat-san",
      CREATE: "/chi-nhanh/:branchId/quan-ly-san/them-moi",
    },
    TOURNAMENT: {
      INDEX: "/chi-nhanh/:branchId/quan-ly-giai-dau",
      ID: "/chi-nhanh/:branchId/quan-ly-giai-dau/:id",
      MATCH: "/chi-nhanh/:branchId/quan-ly-giai-dau/:id/:matchId",
      GIAI_THUONG: {
        ID: "/chi-nhanh/:branchId/quan-ly-giai-dau/giai-thuong/:id",
      },
      CREATE: "/chi-nhanh/:branchId/quan-ly-giai-dau/them-moi",
    },
    GUEST: {
      CREATE: "/chi-nhanh/:branchId/khach-hang/them-moi",
    },
    SETTING: {
      INDEX: "/chi-nhanh/:branchId/cai-dat",
      ID: "/chi-nhanh/:branchId/cai-dat/:id",
    },
  },
  AUTH: {
    SIGN_IN: "/dang-nhap",
    SIGN_UP: "/dang-ky",
    FORGOT_PASSWORD: "/quen-mat-khau",
  },
  HO_SO: {
    INDEX: "/ho-so",
    ID: "/ho-so/:id",
    EDIT: "/ho-so/chinh-sua",
  },
}

export default ROUTE
