export default [
    {
        "title": "Home",
        "icon": "home",
        "path": "/home",
        "children": [
            {
                "title": "工作台",
                "icon": "line-chart",
                "path": "/home/workbench"
            },
            {
                "title": "个人设置",
                "icon": "setting",
                "path": "/home/items"
            }
        ]
    },
    {
        "title": "平台管理",
        "icon": "desktop",
        "path": "/platform",
        "children": [
            {
                "title": "权限管理",
                "icon": "file-protect",
                "path": "/platform/rbac",
                "children": [
                    {
                        "title": "用户管理",
                        "icon": "",
                        "path": "/platform/rbac/user"
                    },
                    {
                        "title": "角色管理",
                        "icon": "",
                        "path": "/platform/rbac/role"
                    },
                    {
                        "title": "用户权限",
                        "icon": null, "path":
                            "/platform/rbac/userrole"
                    },
                    {
                        "title": "角色权限",
                        "icon": null,
                        "path": "/platform/rbac/rolemenu"
                    },
                    {
                        "title": "模块管理",
                        "icon": null,
                        "path": "/platform/rbac/module"
                    },
                    {
                        "title": "页面管理",
                        "icon": null,
                        "path": "/platform/rbac/page"
                    },
                    {
                        "title": "菜单管理",
                        "icon": null,
                        "path": "/platform/rbac/treemenu"
                    },
                    {
                        "title": "节点管理",
                        "icon": null,
                        "path": "/platform/rbac/node"
                    }
                ]
            },
            {
                "title": '系统管理',
                "icon": "control",
                "path": "/platform/gods/syst",
                "children": [
                    {
                        "title": '上级日志',
                        "icon": "",
                        "path": "/platform/syst/signlog",
                    },
                ]
            },
            {
                "title": '组织机构',
                "icon": "apartment",
                "path": "/platform/gods",
                "children": [
                    {
                        "title": '集团',
                        "icon": "",
                        "path": "/platform/gods/group",
                    },
                    {
                        "title": '组织',
                        "icon": "",
                        "path": "/platform/gods/org",
                    },
                    {
                        "title": '部门',
                        "icon": "",
                        "path": "/platform/gods/dept",
                    },
                    {
                        "title": '岗位',
                        "icon": "",
                        "path": "/platform/gods/post",
                    }
                ]
            }
        ]
    }
]