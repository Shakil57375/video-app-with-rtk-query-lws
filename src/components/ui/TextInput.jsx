export default function TextInput({ title, ...attributes }) {
    return (
        <>
            <label className="block text-sm font-medium text-gray-700 border p-3">
                {title}
            </label>
            <input
                type="text"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-4 "
                {...attributes}
            />
        </>
    );
}
