import { forwardRef, useImperativeHandle, useState } from "react";
import "./SnackBar.css";


interface Props {
    type: "done" | "error" | "warning";
    message: string;
}

export const SnackBar = forwardRef(({ type, message }: Props, ref) => {
    const [showSnackBar, setShowSnackBar] = useState(false);

    useImperativeHandle(ref, () => ({
        show() {
            setShowSnackBar(true);
            setTimeout(() => {
                setShowSnackBar(false);
            }, 5000);
        },
    }));

    let snackBarClass = type + " snackbar";

    return (
        <div id={showSnackBar ? "show" : "hide"}
            className={snackBarClass}>
            <div className="symbol">
                <span
                    className='material-symbols-outlined'>
                    {type}
                </span>
            </div>
            <div className="message">{message}</div>
        </div>
    );
});