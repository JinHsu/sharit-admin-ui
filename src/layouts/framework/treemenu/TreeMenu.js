/**
 * JSX递归渲染菜单树
 *
 * @param theme dark | light
 * @param mode horizontal | inline | vertical
 * @param treeData tree data of this menu
 */
export default {
    name: "TreeMenu",

    props: {
        // dark | light
        theme: {
            type: String,
            default: 'light'
        },
        // 菜单类型，现在支持
        // 1.水平(horizontal)
        // 2.内嵌模式(inline)，菜单全部嵌在内部
        // 3.垂直(vertical)，子菜单弹出
        mode: {
            type: String,
            default: 'vertical'
        },
        // 封装好的树形结构的菜单数据。
        // [key: '', title: '', path: '', icon: '', children: []]
        treeData: {
            type: Array,
            default: () => []
        },
        //
        collapsed: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            openKeys: [],
            selectedKeys: [],
            cachedOpenKeys: []
        }
    },

    computed: {
        rootSubmenuKeys: vm => {
            const keys = []
            const recursion = (menus) => {
                if (menus && menus.length > 0) {
                    menus.forEach(item => {
                        if (item.children && item.children.length > 0) {
                            keys.push(item.path)
                            recursion(item.children)
                        }
                    })
                }
            }
            recursion(vm.treeData)
            return keys
        }
    },

    methods: {
        // select menu item
        onOpenChange(openKeys) {
            // 开启手风琴模式
            const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
            if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
                this.openKeys = openKeys
            } else {
                //
                let _openKey = [latestOpenKey]
                openKeys.forEach(openKey => latestOpenKey.startsWith(openKey) && _openKey.push(openKey))
                this.openKeys = _openKey
            }
        },

        onSelect({item, key, selectedKeys}) {
            this.selectedKeys = selectedKeys
            this.$emit('select', {item, key, selectedKeys})
        },

        updateMenu() {
            const routes = this.$route.matched.concat()
            const {hidden} = this.$route.meta
            if (routes.length >= 3 && hidden) {
                routes.pop()
                this.selectedKeys = [routes[routes.length - 1].path]
            } else {
                this.selectedKeys = [routes.pop().path]
            }
            const openKeys = []
            routes.forEach(item => item.path && openKeys.push(item.path))
            this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
        },
        // 渲染菜单项
        renderMenuItem(menu) {
            // 图标
            const icon = menu.icon ? (<a-icon type={menu.icon}/>) : null
            return (
                <a-menu-item key={menu.path}>
                    <router-link to={menu.path}>
                        {icon}
                        <span>{menu.title}</span>
                    </router-link>
                </a-menu-item>
            )
        },

        // 渲染子菜单
        renderSubMenu(menu) {
            // 递归渲染子菜单
            const menuItems = menu.children.map(item => {
                return item.children ? this.renderSubMenu(item) : this.renderMenuItem(item)
            })
            // 图标
            const icon = menu.icon ? (<a-icon type={menu.icon}/>) : null
            return (
                <a-sub-menu key={menu.path}>
                    <span slot="title">
                        {icon}
                        <span>{menu.title}</span>
                    </span>
                    {menuItems}
                </a-sub-menu>
            )
        }

    },

    render() {
        if (!this.treeData || this.treeData.length === 0) {
            return (<a-empty/>)
        }

        // 子菜单和菜单项
        const menuTree = this.treeData.map(menu => {
            return menu.children ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
        })

        const props = {
            props: {
                mode: this.mode,
                theme: this.theme,
                inlineCollapsed: this.collapsed,
                openKeys: this.openKeys,
                selectedKeys: this.selectedKeys
            },
            on: {
                openChange: this.onOpenChange,
                select: this.onSelect
            }
        }

        return (<a-menu {...props}>{menuTree}</a-menu>)
    },

    mounted() {
        this.updateMenu()
    },

    watch: {
        collapsed(val) {
            if (val) {
                this.cachedOpenKeys = this.openKeys.concat()
                this.openKeys = []
            } else {
                this.openKeys = this.cachedOpenKeys
            }
        },

        '$route': function () {
            this.updateMenu()
        }
    },

}