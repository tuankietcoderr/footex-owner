const ROUTE = {
  BASE: "/",
  DASHBOARD: "/dashboard",
  QUAN_LY_SAN: {
    BASE: "/quan-ly-san",
    ID: "/quan-ly-san/:id",
  },
  QUAN_LY_GIAI_DAU: {
    BASE: "/quan-ly-giai-dau",
    ID: "/quan-ly-giai-dau/:id",
    GIAI_THUONG: {
      ID: "/quan-ly-giai-dau/giai-thuong/:id",
    },
  },
  QUAN_LY_CHI_NHANH: {
    BASE: "/quan-ly-chi-nhanh",
    ID: "/quan-ly-chi-nhanh/:id",
  },
}

export default ROUTE
