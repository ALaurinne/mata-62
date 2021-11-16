import React from 'react'

export default function RegionRequirement() {

    async function fetchRooms() {
      await FirebaseService.createOrUpdateRoleSolicitation({
        uid: user?.uid ?? undefined,
        role: userRole,
      })
    }


    return (
        <div>
            
        </div>
    )
}
