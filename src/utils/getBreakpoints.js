import { useEffect, useState } from 'react'

const getDeviceConfig = (width) => {
    if (width < 320) {
        return 'xs'
    } else if (width >= 320 && width < 720) {
        return 'sm'
    } else if (width >= 720 && width < 1024) {
        return 'md'
    } else if (width >= 1024) {
        return 'lg'
    }
};

const useBreakpoint = () => {
    const isWindowClient = typeof window === "object"

    const [breakpoint, setBreakpoint] = useState(
      isWindowClient ? getDeviceConfig(window.innerWidth) : undefined
    );
  
    useEffect(() => {
      function setSize() {
        setBreakpoint(getDeviceConfig(window.innerWidth))
      }
  
      if (isWindowClient) {
        window.addEventListener("resize", setSize)
  
        return () => window.removeEventListener("resize", setSize)
      }
    }, [isWindowClient, setBreakpoint])
  
    return breakpoint
}

export default useBreakpoint