export default [
    {
        "title": "Home",
        "icon": "el-icon-s-home",
        "path": "/home",
        "children": [
            {
                "title": "工作台",
                "icon": "el-icon-eleme",
                "path": "/home/workbench"
            },
            {
                "title": "个人设置",
                "icon": "setting",
                "path": "/home/settings"
            }
        ]
    },
    {
        "title": "平台管理",
        "icon": "el-icon-s-platform",
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
                        "path": "/platform/rbac/menu"
                    },
                    {
                        "title": "节点管理",
                        "icon": null,
                        "path": "/platform/rbac/node"
                    }
                ]
            }
        ]
    }
]