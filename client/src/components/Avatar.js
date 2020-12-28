import React from 'react'

export default function Avatar(props) {
	return (
		<img className="profile-pic-sm"
			src={props.user.avatarUrl}
			alt={props.user.name}
		/>
	)
}
