import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import PropTypes from 'prop-types'

const CodeExplanation = ({ explanation }) => {
    return (
        <div className="w-full max-w-4xl mt-6 explanation-card p-6 rounded-2xl shadow-lg">
            <h2 className="font-semibold mb-2 text-xl">Explanation:</h2>
            <Markdown remarkPlugins={[remarkGfm]}>{explanation}</Markdown>
        </div>
    )
}

export default CodeExplanation

CodeExplanation.propTypes = {
    explanation: PropTypes.string,
}