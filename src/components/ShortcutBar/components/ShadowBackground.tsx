
type Props = {
    windowStatus: boolean;
    closeWindow: () => void;
}

export default function({ windowStatus, closeWindow }: Props){
    return(
        <div className={`${windowStatus?(``):(`hidden`)} fixed h-[100svh] w-full bg-[#00000099] z-[1]`}
        onClick={() => closeWindow()}
        >
        </div>
    )
}