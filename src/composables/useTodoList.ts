import { reactive, ref, watch } from "vue";
// 1. 引入 Quasar 的 Notify 元件
import { Notify } from "quasar";

export function useTodoList(){
    interface TodoList {
        id: number
        text: string
        isDone: boolean
    }
    const todolistForm = reactive<TodoList>({
         id :0, 
         text:'', 
         isDone:false
    })
    //從瀏覽器的 localStorage 抓取之前的紀錄
    const savedData = localStorage.getItem('my_todo_list');
    //初始化清單
    const todoList = reactive<TodoList[]>(
        savedData ? JSON.parse(savedData) : []
    )
    // 計算 idNo 的起點
    // 如果 todoList 有東西，就找到目前最大的 id 當基底；如果是空的，起點就是 0
    const maxId = todoList.length > 0 ? Math.max(...todoList.map(item => item.id)) : 0;
    const idNo = ref(maxId)

    //自動存檔，只要清單有變動就即時寫入 localStorage
    watch(todoList, (newVal) => {
        localStorage.setItem('my_todo_list', JSON.stringify(newVal));
    }, { deep: true });//深度監控只要有變化就動作

    //新增按鈕的方法
    async function insertTodoList() {
        if (!todolistForm.text.trim()) return; // 防呆：沒打字就不讓新增
        idNo.value++;
        todoList.push({
            id: idNo.value,
            text: todolistForm.text,
            isDone: false
        });
        
        // 2. 加入 Quasar 新增成功的通知
        Notify.create({
            type: 'positive',
            message: `成功新增：${todolistForm.text}`,
            position: 'top-right',
            timeout: 2000
        });

        //清空新增輸入框內容
        todolistForm.text='';
    }

    //刪除按鈕的方法
    async function cancelTodoList(id: number) {
        //找出點擊的那筆資料
        const list = todoList.find(item => item.id === id);
        //如果資料存在且已經打勾完成
        if (list && list.isDone) {
            //篩出所有id不等於目前點擊id的項目重新指給陣列
            const filteredList = todoList.filter(item => item.id !== id);
            
            // 3. 在清空前先拿文字做通知
            Notify.create({
                type: 'negative',
                message: `已刪除：${list.text}`,
                position: 'top-right',
                timeout: 2000
            });

            //清空原本的陣列把過濾後的資料重新丟進去
            todoList.length = 0; 
            todoList.push(...filteredList);
        }
    }
    //更新isDone狀態
    function updateisDone(id: number) {
        const item = todoList.find(todo => todo.id === id);
        if (item) {
            item.isDone = !item.isDone; // false 變 true，true 變 false
        }
    }
    //編輯更新內容，將編輯框內容替換進待辦事項
    function updateText(id:number,newtext:string){
        const item = todoList.find(todo => todo.id === id);
         if (item) {
            item.text = newtext; 

            // 4. 加入 Quasar 儲存成功的通知
            Notify.create({
                type: 'info',
                message: '修改內容已儲存',
                position: 'top-right',
                timeout: 1500
            });
        }
    }

    return { 
        todolistForm, 
        todoList, 
        insertTodoList, 
        cancelTodoList,
        updateisDone,
        updateText,
    };
}