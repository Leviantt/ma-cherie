import type { Employee } from '@prisma/client';
import type { EmployeeFilterParams } from '~/types/EmployeeFilterParams';

export function filterEmployees(
	fp: EmployeeFilterParams,
	employees: Employee[]
): Employee[] {
	return employees
		.filter((e) => {
			if (fp.managersOnly) {
				return (
					e.position.toLowerCase() === 'manager' ||
					e.position.toLowerCase() === 'менеджер'
				);
			}
			return true;
		})
		.filter((e) => e.age >= fp.startAge && e.age <= fp.endAge)
		.filter((e) => e.hireDate.getTime() >= fp.hireDateSince.getTime());
}
