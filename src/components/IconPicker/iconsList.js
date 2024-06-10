import {
  LockOpenRounded,
  GridViewRounded,
  FactCheckRounded,
  LeaderboardRounded,
  PeopleAltRounded,
  TuneRounded,
  AccountBoxRounded,
  AdminPanelSettingsRounded,
  CorporateFareRounded
} from "@mui/icons-material";

export const iconsList = [
  {
    name: "dashboard",
    component: GridViewRounded,
  },
  {
    name: "restaurants",
    component: FactCheckRounded,
  },
  {
    name: "organization",
    component: CorporateFareRounded
  },
  {
    name: "reports",
    component: LeaderboardRounded,
  },
  {
    name: "admins",
    component: PeopleAltRounded,
  },
  {
    name: "settings",
    component: TuneRounded,
  },
  {
    name: "admin",
    component: AdminPanelSettingsRounded,
  },
  {
    name: 'roles',
    component: AccountBoxRounded
  },
  {
    name: 'lock',
    component: LockOpenRounded
  }
];
