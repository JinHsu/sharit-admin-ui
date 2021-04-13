import store from '@/store'

const module = {

    namespaced: true,

    state: {
        // 执行监听器
        executionListenerEditorVisible: false,
        executionListenerSize: 0,
        //
        taskListenerEditorVisible: false,
        taskListenerSize: 0,

        //
        multiInstanceEditorVisible: false,

        //
        signalEditorVisible: false,

    },

    mutations: {
        //
        setExecutionListenerEditorVisible: (state, visible) => state.executionListenerEditorVisible = visible,
        setExecutionListenerSize: (state, size) => state.executionListenerSize = size,
        //
        setTaskListenerEditorVisible: (state, visible) => state.taskListenerEditorVisible = visible,
        setTaskListenerSize: (state, size) => state.taskListenerSize = size,
        //
        setMultiInstanceEditorVisible: (state, visible) => state.multiInstanceEditorVisible = visible,
        //
        setSignalEditorVisible: (state, visible) => state.signalEditorVisible = visible,
    },

    actions: {
        //
        setExecutionListenerEditorVisible: ({commit}, visible) => commit('setExecutionListenerEditorVisible', visible),
        setExecutionListenerSize: ({commit}, size) => commit('setExecutionListenerSize', size),
        //
        setTaskListenerEditorVisible: ({commit}, visible) => commit('setTaskListenerEditorVisible', visible),
        setTaskListenerSize: ({commit}, size) => commit('setTaskListenerSize', size),
        //
        setMultiInstanceEditorVisible: ({commit}, visible) => commit('setMultiInstanceEditorVisible', visible),
        //
        setSignalEditorVisible: ({commit}, visible) => commit('setSignalEditorVisible', visible),
    },

}


export default function registerModule() {
    if (store.hasModule('bpmn')) {
        store.unregisterModule('bpmn')
    }
    store.registerModule('bpmn', module)
}

