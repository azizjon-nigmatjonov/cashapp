export const elements = [
  {
    id: "dashboard",
    title: "Дешборд",
    path: "dashboard",
    icon: "dashboard",
  },
  {
    id: "organizations",
    title: "Организации",
    path: "organizations",
    icon: "organization",
  },
  {
    id: "reports",
    title: "Отчеты",
    path: "reports",
    icon: "reports",
  },
  {
    id: "settings",
    title: "Настройки",
    path: "settings",
    icon: "settings",
    children: [
      {
        id: "admin",
        title: "Админ",
        path: "admin",
        icon: "admin",
      },
      {
        id: "roles",
        title: "Роли",
        path: "roles",
        icon: "roles",
      },
      {
        id: 'permissions',
        title: 'Разрешения',
        path: 'permissions',
        icon: 'lock'
      },
    ],
  },
  // {
  //   id: "newone",
  //   title: "newone",
  //   path: "newone",
  //   icon: "lock",
  //   children: [
  //     {
  //       id: 'newonechild',
  //       title: 'newonechild',
  //       path: 'newonechild',
  //       icon: 'lock'
  //     },
  //   ],
  // },
];
