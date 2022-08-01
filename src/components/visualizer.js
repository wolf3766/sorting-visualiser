import {useState,useEffect} from "react";
import useSound from 'use-sound';
import sound1 from './sounds/sound1.wav'
import sound2 from './sounds/sound2.wav'
import Button from './assets/Button'
import Dropdown from './assets/Dropdown'
import Slider from './assets/Slider'
import Toggle from './assets/Toggle'

const ARRAYSIZE=100;

const Visualizer=()=>{
    const [primaryArray,setPrimaryArray]=useState([]);
    const [algorithm,setAlgorithm]=useState('bubbleSort');
    const [animationSpeed,setAnimationSpeed]=useState(50);
    const [soundOn,setSoundOn]=useState(true);
    const [disableOptions,setDisableOptions]=useState(false);
    const [playBeep1]=useSound(sound1,{volume: soundOn ? 0.15 : 0})
    const [playBeep2]=useSound(sound2,{volume:soundOn ? 0.15 : 0})
    

    const randomizeArray=()=>{
        for(let i=0;i<primaryArray.length;i++){
            let bar = document.getElementById(i).style
            bar.backgroundColor='#ff7f50'
        }
        let array=[]
        for(let i=0;i<ARRAYSIZE;i++){
            array.push(randomVals(20,400))
        }
        setPrimaryArray(array);
    } 
        
const randomVals=(min,max)=>{
    let randomVal=Math.floor(Math.random()*(max-min+1)+min)
    return randomVal;
}
useEffect(()=>{
    randomizeArray();
},[]); 

const sleep=(milliSeconds)=>{
    return new Promise((resolve)=> setTimeout(resolve,milliSeconds))
}

const finishedAnimation= async () =>{
    for(let i=0;i<primaryArray.length;i++){
        let bar=document.getElementById(i).style
        bar.backgroundColor='green'
        playBeep1()
        await sleep(animationSpeed)
    }
    setDisableOptions(false);
} 

const handleSorting=()=>{
    setDisableOptions(true)
    switch (algorithm){
        case 'bubbleSort':
            bubbleSort()
            break
        case 'selectionSort':
            selectionSort()
            break
        case 'insertionSort':
            insertionSort()
            break      
        case 'mergeSort':
            mergeSort()
            break
        case 'quickSort':
            quickSort()
            break    
        default:
            break        
    }
}

        // ----------------------ALGORITHMS-----------------------//
  //Bubble Sort 
  const bubbleSort = async()=>{
    let currentArr=primaryArray
    let sorted=false
    setAlgorithm({name: 'Bubble Sort', timeComplexity: 'O(n^2)'})

    while(!sorted){
        sorted=true
        for(let i=0;i<currentArr.length-1;i++){
            console.log("working");
            for(let j=0;j<currentArr.length-i-1;j++){
                if(currentArr[j]>currentArr[j+1]){
                    let temp=currentArr[j];
                    currentArr[j]=currentArr[j+1];
                    currentArr[j+1]=temp;
                    //swap(currentArr[j],currentArr[j+1]);
                    setPrimaryArray([...primaryArray,currentArr])

                    let bar1=document.getElementById(j).style
                    let bar2=document.getElementById(j+1).style
                    bar1.backgroundColor = '#DC143C' //red color 
                    bar2.backgroundColor = '#6A5ACD' // blue color
        
                    await sleep(animationSpeed)    

                    bar1.backgroundColor="#FF7F50"
                    bar2.backgroundColor="#FF7F50"

                    sorted=false
                    playBeep1()
                }
            } playBeep2()
        } if(sorted) finishedAnimation();
    }

  }    

//INSERTION SORT

const insertionSort=async () =>{
    let currentArr=primaryArray
    let sorted=false
    setAlgorithm({name:"INSERTION SORT", timeComplexity:'O(n^2)'})

    while(!sorted){
        sorted=true;
        for(let i=1;i<currentArr.length;i++){
            let current=currentArr[i]
            let j=i-1
            while(j>=0 && currentArr[j]>current){
                currentArr[j+1]=currentArr[j]
                setPrimaryArray([...primaryArray,currentArr])
                let bar1=document.getElementById(j+1).style
                let bar2=document.getElementById(j).style
                bar1.backgroundColor='#DC143C'
                bar2.backgroundColor='#6A5ACD'

                await sleep(animationSpeed)

                bar1.backgroundColor='#FF7F50'
                bar2.backgroundColor='#FF7F50'
                j--
               // sorted=false
                playBeep1()
            }
            currentArr[j+1]=current
            setPrimaryArray([...primaryArray,currentArr])
            playBeep2()
        }
        if(sorted) finishedAnimation()
    }
}

//selectionSort

const selectionSort=async ()=>{
    let currentArr=primaryArray
    let sorted=false
    setAlgorithm({name: 'Selection Sort', timeComplexity:'O(n^2)'})

    while(!sorted){
        sorted=true;
        for(let i=0;i<currentArr.length-1;i++){
            let st=i;
            for(let j=i+1;j<currentArr.length;j++){
                if(currentArr[st]>currentArr[j]){
                        st=j;
                        let bar1=document.getElementById(st).style
                        let bar2=document.getElementById(j).style
                        bar1.backgroundColor="#DC143C"
                        bar2.backgroundColor="#6A5ACD"
                        await sleep(animationSpeed)
                        bar1.backgroundColor="#FF7F50"
                        bar2.backgroundColor="#HH7F50"
                }
            } 
            let temp=currentArr[i];
            currentArr[i]=currentArr[st];
            currentArr[st]=temp;
            setPrimaryArray([...primaryArray,currentArr]);
           
           // sorted=false
            playBeep1()
           
        }  playBeep2()
        if(sorted) finishedAnimation()
    }
}

//merge Sort

const mergeSort = async()=>{
    let currentArr=primaryArray
    setAlgorithm({name:'Merge Sort',timeComplexity:'O(nlog(n))'})

    await sort(currentArr,0,currentArr.length-1)
    finishedAnimation()
}

const sort =async (arr,low,high)=>{
    if(low<high){
        let mid=Math.floor((low+high)/2)
        await sort(arr,low,mid)
        await sort(arr,mid+1,high)
        await merge(arr,low,mid,high)
    }
}

const merge = async(arr,low,mid,high)=>{
    let i=low
    let j=mid+1
    let k=0
    let tempArr=[]

    while(i<=mid && j<=high){
        if(arr[i] < arr[j]){
            tempArr[k]=arr[i]
            i++;
            k++;
        }else{
            tempArr[k] = arr[j] 
            j++;
            k++;
        }
        setPrimaryArray([...primaryArray,tempArr])

        let bar1=document.getElementById(i).style
        let bar2=document.getElementById(j).style
        bar1.backgroundColor="#DC143C"
        bar2.backgroundColor="#6A5ACD"

        await sleep(animationSpeed)
        bar1.backgroundColor='#FF7F50'
        bar2.backgroundColor='#FF7F50'

        playBeep1()
    }
    while(i<=mid){
        tempArr[k]=arr[i]
        setPrimaryArray([...primaryArray,tempArr])

        let bar1=document.getElementById(i).style
        let bar2=document.getElementById(j).style

        bar1.backgroundColor='#DC143C'
        bar2.backgroundColor='#FF7F50'
        playBeep1()
        i++;
        k++;
    }
     while(j <=high){
        tempArr[k]=arr[j]
        setPrimaryArray([...primaryArray,tempArr])

        let bar1=document.getElementById(i).style
        let bar2=document.getElementById(j).style
        bar1.backgroundColor='#DC143C'
        bar2.backgroundColor='#6A5ACD'

        await sleep(animationSpeed)
        bar1.backgroundColor='#FF7F50'
        bar2.backgroundColor='#FF7F50'
        playBeep1()

        j++;
        k++;
     }
     for(let i=low; i<=high; i++) {
            arr[i]=tempArr[i-low]
            setPrimaryArray([...primaryArray,arr])
            playBeep2()
    }    
    }

    //quickSort 
    const quickSort= async () =>{
        setAlgorithm({name: 'quickSort', timeComplexity:'O(n log(n)'})
        let currentArr=primaryArray

        await sorts(currentArr,0,currentArr.length-1)
        finishedAnimation()
    }

    const sorts = async (arr,left,right)=>{
        if(left<right){
            let partitionIndex=partition(arr,left,right)

            setPrimaryArray([...primaryArray,arr])
            await sleep(animationSpeed)
            playBeep2()

            await sorts(arr,left,partitionIndex-1)
            await sorts(arr,partitionIndex+1,right)
        }
    }
    
    const partition = (arr,left,right)=>{
        let pivot=arr[right]
        let i=left-1;
        playBeep1()
        for(let j=left;j<right;j++){
            if(arr[j] < pivot){
                i++;
                let temp=arr[i]
                arr[i]=arr[j]
                arr[j]=temp

                let bar1=document.getElementById(i).style
                let bar2=document.getElementById(j).style
                bar1.backgroundColor="#DC143C"
                bar2.backgroundColor="#6A5ACD"


                setTimeout(()=>{
                    bar1.backgroundColor="#FF7F50"
                    bar2.backgroundColor="#FF7F50"
                },200) 
                
                setPrimaryArray([...primaryArray,arr])
            }
        }

        let temp=arr[i+1]
        arr[i+1]=arr[right]
        arr[right]=temp

        return i+1
    }

    return (
        <div>
        <div className="header">
            <Button 
            type="NEWARRAY"
            name="New Array"
            onClick={randomizeArray}
            disabled={disableOptions}
            />
        
        <Dropdown 
        onClick={(e)=> setAlgorithm(e.target.value)}
        disabled={disableOptions}
        />

        <Slider 
            onChange={(e)=>setAnimationSpeed(e.target.value)}
            disabled={disableOptions}
        />

        <Toggle 
            context="Sound"
            defaultChecked={soundOn}
            soundState={soundOn ? 'On' : 'Off'}
            onChange={()=>{
                setSoundOn(!soundOn);
            }} 
            disabled={disableOptions}
        />
        
        <Button 
            onClick={handleSorting}
            type="SORT"
            name="Sort"
            disabled={disableOptions}
        />  
        </div> 
         <div className="sortingBars">
            {primaryArray && 
                primaryArray.map((val,key)=>{
                    return(
                        <div className="bars" id={key} key={key} style={{height:val}}>
                        </div>
                    )
                })}
            </div>

        {algorithm.name !==undefined && (
            <div className="algoInfo">
                <div>Algorithm :{algorithm.name}</div>
                <div>Time Complexity: {algorithm.timeComplexity}</div>
             </div>
        )}

        </div>
    ) 
        
    }

    export default Visualizer;