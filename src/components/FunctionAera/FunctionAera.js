import './FunctionAera.css'
import '../../font/iconfont.css'
import News from '../News/News'
import Todo from '../Todo/Todo'
import Pictures from '../Pictures'
import Notes from "../Notes";
import Weather from '../Weather/Weather'
import CalComponent from '../Calendar/CalComponent'
// import Apps from '../Apps/Apps'
import Competition from '../Competition/Competition'
import CountDown from '../CountDown/CountDown'
import FuncCard from '../FuncCard/FuncCard'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import {arrayMoveImmutable} from 'array-move'
// import { useSelector } from 'react-redux'
import { useState } from 'react'


const funcs = [<News/>,<Todo/>,<Pictures/>,<Notes/>,<Weather/>,<CalComponent/>,<CountDown/>,<Competition/>]

const SortableItem = SortableElement(({value}) => <div className='sortableItem'>{funcs[value]}</div>);
const SortableList = SortableContainer(({items}) => {
        return (
          <div className='sortable'>
            {items.map((value, index) => (
              <SortableItem onClick={()=>console.log(value)} key={index} index={index} value={value} />
            ))}
          </div>
        );
    });

//测试上传
export default function FunctionAera(){   //中间的功能组件，放在里面
 
    //先重新排列这些组件，统一组件大小
    let functionList = localStorage.getItem('functionList')? localStorage.getItem('functionList'):"[0,1,2,3,4,5,6,7]"
    //const functionList = useSelector(state=>state.functionList)
    const [items, setItems] = useState(JSON.parse(functionList));
    
    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems( 
             arrayMoveImmutable(items, oldIndex, newIndex),
          );
          localStorage.setItem('functionList',JSON.stringify(arrayMoveImmutable(items, oldIndex, newIndex)))
      };
    
    return (
        <div className='functionAera'>
        <SortableList distance={2} axis='xy' items={items} onSortEnd={onSortEnd} />
        </div>
    )
}