<template>
    <div>
        工作台
        <a-divider/>
        <a-tree
                :checkable="true" :blockNode="true" checkStrictly defaultExpandAll
                :checkedKeys="checkedKeys"
                :treeData="treeData"
                @check="onCheck"
        >

        </a-tree>
    </div>
</template>

<script>
    export default {
        name: "Workbench",

        data() {
            return {
                checkedKeys: [],
                treeData: [
                    {
                        key: '1', value: '1', title: 'Node-1', /*checkable: false,*/
                        children: [
                            {key: '1-1', value: '1-1', title: 'Node-1-1'},
                            {key: '1-2', value: '1-2', title: 'Node-1-2'},
                            {key: '1-3', value: '1-3', title: 'Node-1-3'}
                        ]
                    },
                    {
                        key: '2', value: '2', title: 'Node-2', /*checkable: false,*/
                        children: [
                            {key: '2-1', value: '2-1', title: 'Node-2-1'},
                            {
                                key: '2-2', value: '2-2', title: 'Node-2-2',
                                children: [
                                    {key: '2-2-1', value: '2-2-1', title: 'Node-2-2-1'},
                                    {key: '2-2-2', value: '2-2-2', title: 'Node-2-2-2'},
                                    {key: '2-2-3', value: '2-2-3', title: 'Node-2-2-3'}
                                ]
                            }

                        ]
                    }
                ]
            }
        },

        methods: {
            onCheck(_, e) {
                if (e.checked) {
                    this.checkParent(e.node, _)
                } else {
                    this.uncheckParent(e.node, _)
                }
                this.checkedKeys = _
            },

            checkParent(node, _) {
                const parent = node.$parent
                if (parent['checked'] === false) {
                    const parentKey = parent['eventKey']
                    if (_.checked.indexOf(parentKey) === -1) {
                        _.checked.unshift(parentKey)
                    }
                    this.checkParent(parent, _)
                }
            },

            uncheckParent(node, _) {
                const parent = node.$parent
                const children = parent.$children
                let count = 0

                children.forEach(node => {
                    if (node.checked) {
                        count++
                    }
                })

                if (count === 1) { // 有且仅有1个
                    const parentKey = parent['eventKey']
                    const index = _.checked.indexOf(parentKey)
                    _.checked.splice(index, 1)
                    this.uncheckParent(parent, _)
                }
            }

        }
    }
</script>

<style scoped>

</style>