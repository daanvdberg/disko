import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReleaseService from '../../service/release';
import { Release as IRelease, GetReleaseResponse } from '../../types';

function Release() {

	const { id } = useParams();
	const [release, setRelease] = useState<IRelease>();

	useEffect(() => {
		ReleaseService.get(id).then((release: GetReleaseResponse) => {
			console.log(release);
			setRelease(release);
		});
	}, []);

	return (
		<div>
			Release
		</div>
	);
}

export default Release;