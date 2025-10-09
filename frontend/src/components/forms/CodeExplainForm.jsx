import { useActionState } from "react"
import { explain } from "../../actions"
import CodeExplanation from "../CodeExplanation"
import Error from "../Error"

const Spinner = () => (
    <svg className="spinner" viewBox="0 0 50 50" aria-hidden="true">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
)

const CodeExplainForm = () => {
    const [formState, formAction, isPending] = useActionState(explain, null)

    return (
        <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
            <form action={formAction} aria-label="Explain code form">
                <label className="block mb-2 font-semibold" htmlFor="language">Language:</label>
                <select id="language" name="language" className="w-full mb-4 p-2 border rounded-lg bg-transparent">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>
                <label className="block mb-2 font-semibold" htmlFor="code">Your Code:</label>
                <textarea
                    id="code"
                    name="code"
                    required
                    placeholder="Enter your code here..."
                    className="w-full p-3 border rounded-lg bg-transparent font-mono text-sm min-h-[150px]"
                />
                <div className="mt-4 flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        aria-busy={isPending}
                    >
                        {isPending ? "Explaining..." : "Explain Code"}
                    </button>
                    {isPending && <div className="inline-block" aria-hidden="true"><Spinner /></div>}
                    <button type="reset" className="px-4 py-2 border rounded-lg" disabled={isPending}>Reset</button>
                </div>
            </form>
            {
                isPending ? (
                    <p className="pending-msg my-3 w-64 p-2 rounded-sm">Waiting for the model to respond…</p>
                ) : formState?.success ? (
                    <CodeExplanation explanation={formState?.data.explanation} />
                ) : (
                    formState?.success === false && (
                        <Error error={formState?.error} />
                    )
                )
            }
        </div>
    )
}

export default CodeExplainForm