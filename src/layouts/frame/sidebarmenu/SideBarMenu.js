import {frame} from '@/mixins'
import menus from './menus'

/**
 * JSX递归渲染菜单树
 */
export default {
    name: "SideBarMenu",

    data() {
        return {
            menus: menus
        }
    },

    mixins: [frame],

    methods: {
        // 渲染菜单项
        renderMenuItem(menu) {
            return (
                <el-menu-item key={menu.path} index={menu.path}>
                    <i class={menu.icon}/>
                    <span slot="title">{menu.title}</span>
                </el-menu-item>
            )
        },

        // 渲染子菜单
        renderSubMenu(menu) {
            // 递归渲染子菜单
            const menuItems = menu.children.map(item => {
                return item.children ? this.renderSubMenu(item) : this.renderMenuItem(item)
            })
            return (
                <el-submenu key={menu.path} index={menu.path}>
                    <template slot="title">
                        <i class={menu.icon}/>
                        <span slot="title">{menu.title}</span>
                    </template>
                    {menuItems}
                </el-submenu>
            )
        }

    },

    render() {
        if (!this.menus || this.menus.length === 0) {
            return (<div/>)
        }

        // 子菜单和菜单项
        const menuTree = this.menus.map(menu => {
            return menu.children ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
        })

        return (
            <el-menu
                collapse={this.collapsed}
                uniqueOpened={false}
                router={true}>
                {menuTree}
            </el-menu>
        )
    }

}