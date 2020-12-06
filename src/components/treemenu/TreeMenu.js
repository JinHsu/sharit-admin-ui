import menus from './mock-menus'

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
            menus: menus
        }
    },

    methods: {
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
        if (!this.menus || this.menus.length === 0) {
            return ({})
        }

        // 子菜单和菜单项
        const menuTree = this.menus.map(menu => {
            return menu.children ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
        })

        return (
            <a-menu mode={this.mode} theme={this.theme} inline-collapsed={this.collapsed}>
                {menuTree}
            </a-menu>
        )
    }

}