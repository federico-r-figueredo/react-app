import { FieldValues, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(3, {message: 'Name must be at least 3 characters'}),
    age: z.number({ invalid_type_error: 'Age field is required'}).min(18, {message: 'Age must be at least 18'})
})

type FormData = z.infer<typeof schema>;

function Form() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    function onSubmit(data: FieldValues) {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input {...register('name')} id="name" type="text" className="form-control mb-2" />
                {errors.name && <div className="alert alert-danger">{errors.name.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input {...register('age', { valueAsNumber: true})} id="age" type="number" className="form-control  mb-2" />
                {errors.age && <div className="alert alert-danger">{errors.age.message}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Form;