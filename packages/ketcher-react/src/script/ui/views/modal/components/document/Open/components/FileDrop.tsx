/****************************************************************************
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/

import { useMemo } from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'

import parentStyles from './OpenOptions.module.less'
import styles from './FileDrop.module.less'
import { DropButton } from './DropButton'
import Icon from 'src/script/ui/component/view/icon'

type FileDropProps = {
  buttonLabel: string
  textLabel: string
  iconName: string
  disabled?: boolean
  disabledText?: string
} & DropzoneOptions

const FileDrop = ({
  buttonLabel,
  textLabel,
  iconName,
  disabled,
  disabledText,
  ...rest
}: FileDropProps) => {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    multiple: false,
    noClick: true,
    disabled,
    ...rest
  })

  const getClassesString = useMemo((): string => {
    const classes = [
      parentStyles.dropContainer,
      isDragActive ? styles.isHovered : null
    ]
    return classes.join(' ')
  }, [isDragActive])

  return (
    <div
      {...getRootProps({
        className: getClassesString
      })}
    >
      <input {...getInputProps()} />
      <DropButton label={buttonLabel} clickHandler={open} disabled={disabled} />
      {disabled ? (
        <p>{disabledText}</p>
      ) : (
        <>
          <p>{textLabel}</p>
          <div className={parentStyles.dropIconWrapper}>
            <Icon name={iconName} />
          </div>
        </>
      )}
    </div>
  )
}

export { FileDrop }
