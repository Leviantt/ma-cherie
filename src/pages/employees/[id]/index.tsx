import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { Employee } from '~/components/Employee';

function DetailedEmployee() {
	const router = useRouter();
	const id = +(router.query.id ?? 0);
	const {
		data: employee,
		isLoading,
		isError,
	} = api.employee.getOne.useQuery({ id });

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Something went wrong.</div>;

	if (!employee) return <div>Not Found</div>;

	return <Employee {...employee} />;
}

export default DetailedEmployee;