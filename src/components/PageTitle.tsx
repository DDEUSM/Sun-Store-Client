type props = {
    children : any
}

function PageTitle({children} : props){
    return (
        <h1 className="text-4xl text-darkGray font-semibold dark:text-white my-1">
            {children}
        </h1>
    )
}

export default PageTitle;