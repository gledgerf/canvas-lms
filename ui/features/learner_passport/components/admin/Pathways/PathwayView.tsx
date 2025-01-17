/*
 * Copyright (C) 2023 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useState} from 'react'
import {IconZoomInLine, IconZoomOutLine} from '@instructure/ui-icons'
import {Button} from '@instructure/ui-buttons'
import type {PathwayViewDetailData, MilestoneData, MilestoneViewData} from '../../types'
import PathwayTreeView from './PathwayTreeView'
import PathwayViewDetailsTray from './PathwayViewDetailsTray'
import MilestoneViewDetaislTray from './MilestoneViewDetailsTray'
import {showUnimplemented} from '../../shared/utils'

type PathwayViewProps = {
  pathway: PathwayViewDetailData
}

const PathwayView = ({pathway}: PathwayViewProps) => {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [pathwayDetailsOpen, setPathwayDetailsOpen] = useState(false)
  const [activeMilestone, setActiveMilestone] = useState<MilestoneViewData>(pathway.milestones[0])
  const [milestoneDetailsOpen, setMilestoneDetailsOpen] = useState(false)

  const handleZoomIn = useCallback(() => {
    setZoomLevel(zoomLevel + 0.1)
  }, [zoomLevel])

  const handleZoomOut = useCallback(() => {
    setZoomLevel(zoomLevel - 0.1)
  }, [zoomLevel])

  const handleSelectFromTree = useCallback(
    (milestone: MilestoneViewData | MilestoneData | null) => {
      if (milestone === null) {
        setMilestoneDetailsOpen(false)
        setPathwayDetailsOpen(true)
      } else {
        // in this context we know it's a MilestoneViewData
        setActiveMilestone(milestone as MilestoneViewData)
        setMilestoneDetailsOpen(true)
        setPathwayDetailsOpen(false)
      }
    },
    []
  )

  const handleCloseMilestoneDetails = useCallback(() => {
    setMilestoneDetailsOpen(false)
  }, [])

  return (
    <>
      <div style={{position: 'relative'}}>
        <div style={{position: 'absolute', top: '.5rem', left: '.5rem', zIndex: 1}}>
          <Button renderIcon={IconZoomOutLine} onClick={handleZoomOut} />
          <Button renderIcon={IconZoomInLine} onClick={handleZoomIn} margin="0 0 0 x-small" />
        </div>
        <div style={{position: 'absolute', top: '.5rem', right: '.5rem', zIndex: 1}}>
          <Button onClick={showUnimplemented}>View as learner</Button>
        </div>

        <PathwayTreeView
          pathway={pathway}
          version="1"
          zoomLevel={zoomLevel}
          selectedStep={null}
          onSelected={handleSelectFromTree}
        />
      </div>
      <PathwayViewDetailsTray
        pathway={pathway}
        open={pathwayDetailsOpen}
        onClose={() => setPathwayDetailsOpen(false)}
      />
      <MilestoneViewDetaislTray
        milestone={activeMilestone}
        open={milestoneDetailsOpen}
        onClose={handleCloseMilestoneDetails}
      />
    </>
  )
}

export default PathwayView
