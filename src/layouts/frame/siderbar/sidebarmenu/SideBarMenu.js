export default {
    name: "SideBarMenu",
    props: {
        treeData: {
            type: Array,
            required: true,
        },
        collapsed: {
            type: Boolean,
            default: false
        }
    },
    components: {},
    data() {
        return {}
    },

    methods: {
        renderMenuItem(menu) {
            return (
                <el-menu-item key={menu.path} index={menu.path}>
                    <i class={menu.icon}/>
                    <span slot="title">{menu.title}</span>
                </el-menu-item>
            )
        },

        renderSubMenu(menu) {
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
        if (this.treeData && this.treeData.length > 0) {
            const menuTree = this.treeData.map(menu => {
                return menu.children ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
            })

            return (
                <el-menu
                    collapse={this.collapsed}
                    uniqueOpened={false}
                    router={false}>
                    {menuTree}
                </el-menu>
            )
        } else {
            return (<div/>)
        }
    }

}