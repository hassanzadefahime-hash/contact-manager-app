const Colorfull =(WrappedComponent)=>{
    const colorfull=['#000' , '#eee' , '#c45050' , '#ff0000' , '#3ce21f' , '#4716c3' , '#9a1067']

    let randomColor = colorfull[Math.floor(Math.random()*6)]

    const classname=`${randomColor}`

    return(props)=>{
        return(
            <div  style={{backgroundColor:classname}}>
                <WrappedComponent {...props} />

                
            </div>
        )
    }
}

export default Colorfull