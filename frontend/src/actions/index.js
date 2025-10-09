"use server"

export async function explain(prevState,formData) {

    const code = formData.get("code")
    const language = formData.get("language")

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/explain-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code, language })
        })

        if (!response.ok) {
            return {
                success:false, error: "Failed to fetch explanation"
            }
        }
        const data = await response.json()
        return { success:true, data}
    } catch (error) {
        return { success:false, error: error.message }
    }
}

