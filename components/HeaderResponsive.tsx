'use client';

import { Button } from '@/components/ui/button';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { HeaderConTent } from '@/components/Header';
import useMediaQuery from '@/hooks/useMediaQuery';
import { usePathname } from 'next/navigation';

export const HeaderResponsive = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isMobile = useMediaQuery('(max-width: 928px)');
  const pathname = usePathname();

  return (
    <>
      {isMobile ? (
        <div className="md:block xl:hidden">
          <Button onClick={() => setIsOpenModal(true)} variant="outline" size="icon">
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <Sheet open={isOpenModal} onOpenChange={() => setIsOpenModal(false)}>
            <SheetContent>
              <HeaderConTent
                onCloseModal={() => setIsOpenModal(false)}
                activeMenu={pathname}
                isResponsive={true}
              />
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <HeaderConTent activeMenu={pathname} />
      )}
    </>
  );
};
